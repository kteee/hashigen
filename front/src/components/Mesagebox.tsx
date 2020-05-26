import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import { hideMessage } from '../reducer/action'
import { storeState  } from '../utilities/types'
import { useSelector, useDispatch } from 'react-redux'

const msgBoxOpen = (store: storeState) => store.message.open
const msgBoxMessage = (store: storeState) => store.message.message

export const Messagebox = () => {

  const dispatch = useDispatch()
  const closeHandler = () => {
    dispatch(hideMessage())
  }

  return (
    <Snackbar
      open={useSelector(msgBoxOpen)}
      autoHideDuration={5000}
      onClose={closeHandler}
      message={useSelector(msgBoxMessage)}
    />
  )
}