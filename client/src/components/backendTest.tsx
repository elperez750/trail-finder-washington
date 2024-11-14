import { useEffect, useState } from 'react'
import axios, {AxiosResponse } from 'axios';




function BackendTest() {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response: AxiosResponse = await axios.get('http://localhost:8000/api/test')
                setData(response.data)
            }
            catch(error: any){
                setError(error.message)
        }
    }

    fetchData()
}, [])



  return (
    <div>
      <h1>Backend test</h1>
      {data ? <p>{data.message}</p> : <p>{error}</p>}
    </div>
  )
}

export default BackendTest
