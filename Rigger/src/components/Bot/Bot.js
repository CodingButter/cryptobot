import Card from '../Card/Card'
import './style.css'

const Bot = ({ botData }) => {
  return (
    <Card>
      <img
        src={`https://cryptoicons.org/api/white/${botData.currency.toLowerCase()}/200`}
        alt={botData.currency}
      />
    </Card>
  )
}

export default Bot
