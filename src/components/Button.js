import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

function Button({ onClick, label, classes, disabled }) {
  return (
    <button className={`btn ${classes}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  classes: PropTypes.string,
  disabled: PropTypes.bool,
}
const StyledButton = styled(Button)`
  margin-left: 10px;
`
export default StyledButton
