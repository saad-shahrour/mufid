import CustomersOpinions from '@/components/CustomersOpinions/CustomersOpinions'
import React from 'react'


const getCustomersOpinions = async () => {
 try {
  const res = await fetch('http://localhost:3000/api/opinions')
  const data = await res.json()
  console.log(data);
  return data.opinions
 } catch (error) {
    console.log(error);
 }
} 


async function page() {

  const data = await getCustomersOpinions()

  return (
        <CustomersOpinions opinions={data}/>
  )
}

export default page