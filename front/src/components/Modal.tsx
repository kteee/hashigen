import React from 'react'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'

import { MyModalProps } from '../utilities/types'

const ModalBody = styled.div`
  position: fixed;
  top: 20%;
  left: 30%;
  background: white;
  width: 40%;
  height: 30%;
  padding: 1em;
`

export const MyModal = (props: MyModalProps) => {

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <ModalBody>
        {props.body}
      </ModalBody>
    </Modal>
  )

}