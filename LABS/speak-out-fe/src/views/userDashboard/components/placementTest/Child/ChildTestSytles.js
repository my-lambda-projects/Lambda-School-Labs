import styled from 'styled-components';
import '../../../../../styles/_variables.scss';

export const TestTimer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
`;

export const Instruction = styled.h3`
  text-align: center;
  color: #333;
  font-weight: 400;
  font-size: 1.6rem;

  @media (max-width: 700px) {
    padding: 0 1rem;
  }
`;

export const Question = styled.h3`
  font-size: 1.8rem;
  line-height: 1.6;
  text-align: center;
  font-weight: 500;
`;

export const Image = styled.img`
  width: 100%;
  outline: 10px solid #fff;
  outline-offset: -9px;
`;

export const RadioContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem 0;
  font-size: 1.5rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const LabelCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.6;
`;

export const RadioInput = styled.input`
  transform: scale(2);
  margin: 1rem 0;
`;

// question = page number, if >= 25 LabelCard flex-direction: column
