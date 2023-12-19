import sys
print(sys.executable)
print(sys.path)

from pymongo import MongoClient

connection_string = 'mongodb+srv://admin:HckgxFqo79MwVrGZ@cluster0.c9xnt4c.mongodb.net'

client = MongoClient(connection_string, maxPoolSize=50)

db = client['AppDB']

users = db['users']
telegram_users = db['telegramUsers']
free_messages_allowed = db['freemessages']
bundles = db['bundles']


from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, CallbackContext
import openai

BOT_TOKEN = '6890701214:AAFRkL5KnMGdUA8gr8UB4sp-jaS18pgwb9Q'
BOT_USERNAME = '@chatgpt_turbo_assistant_bot'
url = 'http://localhost:3000/subscribe'
subscribe_message = f'Please check our bundles [here]({url}) , then use the /subscribe command to confirm subscription'


async def start_command(update:Update, context: CallbackContext):
    tele_user_id = update.message.from_user.id
    telegram_user = telegram_users.find_one({'userId': tele_user_id})
    free_messages_allowed_number = free_messages_allowed.find_one({}).get('number', None)
    if not telegram_user:
        print('not exists')
        telegram_users.insert_one({
            'userId': tele_user_id,
            'messagesAllowed': free_messages_allowed_number
        })
        # context.user_data['allowedToMessage'] = True
        await update.message.reply_text('Hello there! I am a gpt3.5 turbo chatbot. How can I help you today?')
    else:
        print('exists')
        if telegram_user.get('messagesAllowed', None) == 0:
            await update.message.reply_text(subscribe_message, parse_mode='MARKDOWN')
            # context.user_data['allowedToMessage'] = False
        else:
            await update.message.reply_text('Hello there! I am a gpt3.5 turbo chatbot. How can I help you today?')
            # context.user_data['allowedToMessage'] = True



async def subscribe_command(update:Update, context:  CallbackContext):
    await update.message.reply_text('Enter the ID you are provided here')
    context.user_data['payment_mode'] = True


async def custom_command(update:Update, context: CallbackContext):
    await update.message.reply_text('custom')


openai.api_key = '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'
messages = [
        {"role": "system",
         "content":
             "You are a kind helpful assistant."}
    ]


async def api_call(message: str):
    messages.append({"role": "user", "content": message})
    chat = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                    messages=messages)

    reply = chat.choices[0].message.content
    print(f"ChatGPT: {reply}")
    messages.append({"role": "assistant", "content": reply})
    return reply


from bson import ObjectId


def is_valid_object_id(id_str):
    try:
        ObjectId(id_str)
        return True
    except Exception as e:
        return False



# Take care of responding to the user what ever it sent
async def handle_message(update: Update, context: CallbackContext):

    payment_mode = context.user_data.get('payment_mode', False)
    print(payment_mode)
    text = update.message.text
    global client
    client = MongoClient(connection_string)
    response = ''
    if payment_mode:
        if is_valid_object_id(text):
            print('payment mode')

            document_id = ObjectId(text)
            user = users.find_one({'_id': document_id})

            if user:
                bought_bundle = user.get('boughtBundle')
                bought_bundle_messages = bought_bundle.get('messages')

                if bought_bundle_messages != 0:
                    response = f'Great! you have {bought_bundle_messages} messages to use. You can talk to ChatGPT now.'
                    telegram_users.update_one({'userId': update.message.from_user.id}, {
                        "$set": {
                            "messagesAllowed": user["boughtBundle"]["messages"],
                            "webUserID": document_id
                        }
                    })
                    context.user_data['payment_mode'] = False
                    # bundleId = user["boughtBundle"]
                    # print(bundleId, True)
                    # bundle = bundles.find_one({'_id': bundleId})
                    # print(bundle, True)
                    #
                    # users.update_one({'_id': document_id}, {
                    #     "$set": {
                    #         "boughtBundle": bundle
                    #     }
                    # })
                    #
                    # print(user.get("boughtBundle.messages"))
                    # telegram_users.update_one({'userId': update.message.from_user.id}, {
                    #     "$set": {
                    #         "messagesAllowed": user["boughtBundle"]["messages"]
                    #     }
                    # })
                    # context.user_data['payment_mode'] = False
                    # response = f'Congratulations! you have {user["boughtBundle"]["messages"]} messages to use'
                    #
                    # users.update_one({'_id': document_id}, {
                    #     "$set": {
                    #         "payed": False
                    #     }
                    # })

                else:
                    response = "you don't have any messages available. " + subscribe_message
            else:
                response = 'no such user, enter an existing ID'
        else:
            response = 'Not valid ID'

        await update.message.reply_text(response, parse_mode='MARKDOWN')
        return


    telegram_user = telegram_users.find_one({'userId': update.message.from_user.id})
    telegram_user_messages_allowed = telegram_user.get('messagesAllowed')

    respone = ""
    if telegram_user_messages_allowed == 0:
        print(True, True)
        response = subscribe_message
    else:
        message_type: str = update.message.chat.type
        text: str = update.message.text
        response = await api_call(text)
        print(f'user ({update.message.chat.id}) in {message_type}: "{text}"')
        telegram_users.update_one({'userId': update.message.from_user.id}, {
            "$set": {
                "messagesAllowed": telegram_user_messages_allowed - 1
            }
        })

        users.update_one(
            {'_id': ObjectId(telegram_users.find_one({'userId': update.message.from_user.id}).get('webUserID'))},
            {
                "$set": {
                    "boughtBundle.messages": telegram_user_messages_allowed - 1
                }
            })


    await update.message.reply_text(response, parse_mode='MARKDOWN')

    return



async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'update: {update} \n caused the error {context.error}')
    response = f'something went wrong'
    await update.message.reply_text(response, parse_mode='MARKDOWN')



if __name__ == "__main__":
    print('bot is starting')

    app = Application.builder().token(BOT_TOKEN).build()

    # Commands
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('subscribe', subscribe_command))
    app.add_handler(CommandHandler('custom', custom_command))

    # Messages
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    # Errors
    app.add_error_handler(error)

    # Check for new user messages(updates)
    print('polling')
    app.run_polling(poll_interval=3)
