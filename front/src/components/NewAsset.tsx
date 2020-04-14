import React, { useEffect } from 'react'
import axios from 'axios'
import {Container} from '../materials/Container'

const NewAsset = () => {

  const url = 'http://localhost:5000/api/test'

  useEffect((): void => {
    axios.get(url)
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err))
  }, [])

  return (
    <Container>
      new asset 画面だよ
    </Container>
  )
}

export default NewAsset