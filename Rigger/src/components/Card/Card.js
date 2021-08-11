import React, { useState } from 'react'
import Typography from '../Textography/Textography'
import Container from '../Container/Container'
import Button from '../Button/Button'
import './style.css'

export default function ({
  className,
  elevation,
  children,
  error,
  title,
  footer,
  backgroundImage,
  expanded
}) {
  const [elev, setElev] = useState(elevation)
  const [expand, setExpand] = useState(expanded)

  const toggleExpand = (exp) => {
    setExpand(!exp)
  }

  const addExpandButton = (exp) => {
    if (expand === true || expand === false) {
      return (
        <Button
          className="expand-collaps"
          onClick={() => toggleExpand(expand)}
          variant="small"
        >
          <span>
            <i className="fas fa-chevron-circle-up"></i>
          </span>
        </Button>
      )
    } else {
      return ''
    }
  }
  const addBackgroundImage = (bgImage) => {
    if (bgImage) {
      return (
        <img
          src={bgImage}
          alt={
            bgImage.split('/')[
              bgImage.split('/').length - 1
            ]
          }
          className="card-title-image"
        />
      )
    }
  }
  const addTitle = (title, bgImage) => {
    if (title) {
      return (
        <div className="card-title">
          <Typography>{title}</Typography>
          {addBackgroundImage(bgImage)}
        </div>
      )
    }
  }
  const addFooter = (footer) => {
    if (footer) {
      return (
        <div className="card-footer">
          <Typography>{footer}</Typography>
          {addExpandButton(expand)}
        </div>
      )
    }
  }
  const addError = (error) => {
    if (error) {
      return (
        <Typography variant="error warning">
          {error}
        </Typography>
      )
    }
  }
  return (
    <div
      onMouseEnter={() => setElev(5)}
      onMouseLeave={() => setElev(0)}
      style={{ '--elev': elev }}
      expanded={expand.toString()}
      className={`elevated card ${className}`}
    >
      {addError(error)}
      {addTitle(title, backgroundImage)}
      <Container
        expanded={expand.toString()}
        className="main-content"
      >
        {children}
      </Container>
      {addFooter(footer)}
    </div>
  )
}
