import styled from 'styled-components';

const Graph = styled.div`
    width:90%;  
    margin: 0 auto;  
    ${'' /* display:flex; */}
    ${'' /* height: 60vh; */}
    ${'' /* justify-content:center; */}
    padding:0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    @media(max-width:800px) {
        width:100%;
    }
`;

export default Graph;