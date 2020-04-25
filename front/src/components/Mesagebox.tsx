import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { SnackbarProps } from '../utilities/types'

export const Messagebox = (props: SnackbarProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.autoHideDuration}
      onClose={props.onClose}
      message={props.message}
    />
  )
}