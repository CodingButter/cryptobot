import React, { useState, useEffect } from 'react'
import './style.css'
import {
  sendWinningTicket,
  confirmWinningTicket,
  getTodaysRaffles
} from '../../services/ServerRequests'
import Card from '../../components/Card/Card'
import Textography from '../../components/Textography/Textography'
import Button from '../../components/Button/Button'

const Rigger = function () {
  const [options, updateOptions] = useState([])
  const [selected, updateSelected] = useState(0)
  const [ticket, setTicket] = useState([])
  const [confirmed, updateConfirmed] = useState({})
  var checkInterval
  if (confirmed && confirmed.ready) {
    clearInterval(checkInterval)
  }
  const handleSendTicket = async (ticketNumber) => {
    setTicket(ticketNumber)
    const swtResponse = await sendWinningTicket(
      ticketNumber
    )
    clearInterval(checkInterval)
    checkInterval = setInterval(() => {
      confirmWinner(ticketNumber)
    }, 1000)
  }

  const confirmWinner = async (ticketNumber) => {
    const confirmTicket = await confirmWinningTicket(
      ticketNumber
    )
    updateConfirmed(confirmTicket)
  }

  const handleUpdateSelected = ({ target }) => {
    updateSelected(target.value)
  }

  useEffect(() => {
    getOptions()
  }, [])

  const getOptions = async () => {
    const opts = await getTodaysRaffles()
    updateOptions(opts)
  }

  const updateInfo = () => {
    if (options[selected]) {
      return (
        <div className="raffle-info">
          <Textography variant="h2">
            {options[selected].item}
          </Textography>
          <div className="button-section">
            <Button
              onClick={() => {
                handleSendTicket(options[selected].ticket)
              }}
              className="win-btn"
              variant="big"
            >
              Win
            </Button>
            <Textography className="ticket-number">
              {options[selected].ticket}
            </Textography>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="rigger">
      <Textography variant="h3">Rigger</Textography>
      <Textography
        className={
          confirmed && confirmed.ready
            ? `${ticket} ticket-confirmed`
            : 'ticket-not-confirmed'
        }
        variant="h4"
      >
        {confirmed && confirmed.ready
          ? `${ticket} Confirmed`
          : 'Ticket Not Set'}
      </Textography>
      <Card
        title="Select Raffle"
        className="rigger-card raffle-card"
        expanded={true}
        footer="Lets get paid"
      >
        <select onChange={handleUpdateSelected}>
          {options.map((option, index) => {
            return (
              <option key={index} value={index}>
                {option.item}
              </option>
            )
          })}
        </select>
      </Card>
      <Card
        title="Win Raffle"
        className="rigger-card ticket-card"
        expanded={true}
        footer="Lets get paid"
      >
        {updateInfo()}
      </Card>
    </div>
  )
}

export default Rigger
