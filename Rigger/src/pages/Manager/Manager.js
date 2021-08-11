import React, { useState } from 'react'
import Typography from '../../components/Textography/Textography'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import './style.css'

const Manager = function () {
  const [options, updateOptions] = useState([])

  return (
    <>
      <Typography variant="h3">Raffle Manager</Typography>
      <div className="content-body">
        <Card
          title="New Raffle"
          className="add-raffle"
          expanded={false}
          footer="Lets get paid"
        >
          <Input
            label="Raffle Item"
            placeHolder="Lamborheni"
          />
        </Card>
        <Card
          title="Edit Raffles"
          className="add-raffle"
          expanded={false}
          footer="Lets get paid"
        >
          <Select
            label="Raffle Item"
            placeHolder="Lamborheni"
            selected={1}
          ></Select>
        </Card>
      </div>
    </>
  )
}

export default Manager
