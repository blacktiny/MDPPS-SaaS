import styled from '@emotion/styled'
import rfs from '../../../../utils/style'

export const FormWrapper = styled.form`
  position: relative;
  padding: calc(1.625rem + 2.8125vw) calc(2rem + 6.51vw);
  height: 100%;
`

export const FormContainer = styled.div`
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
`

export const Title = styled.h3`
  color: #14171a;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: calc(1.4625rem + 1.59375vw);
`

export const RoundAvatarWrapper = styled.div`
  padding-right: ${rfs('145px')};
`

export const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: -6.875rem;
  left: 0;
  width: calc(100% + calc(2.03125rem + 5.85938vw));
  margin: 0 calc(-2.03125rem - 5.85938vw);
  padding: calc(1.3125rem + 0.46875vw) 0;
  background-color: #eff3f5;
  text-align: right;

  button {
    width: 190px;
    height: 50px;
    border-radius: 5px;
  }
`
