import styled from 'styled-components';

const DeleteContainer = styled.div`
        position: fixed;
        top: 20%;
        left: center;
        background-color: rgb(43, 7, 43,0.8);
        z-index: 2;
        display:flex;       
        flex-direction:column;
        justify-content: space-around;
        border:1px solid rgba(0,0,0,.55);
        align-items: flex-start;
        width: 280px;
        height: 300px;
        padding: 60px 30px 60px 60px;
        ${'' /* margin:100px auto; */}
        div {
            color: orange;
            text-align:center;
            font-size:18px;
            color:#FFF;
            padding-left:0px;
            margin-top:0px;            
            ul {
                margin-top:0px;
                margin-left:0px;
                padding-left:0px;
                list-style-type:none; 
                .error {
                    color:red;
                    font-size:20px;
                }

                li {
                    padding-left:0px;
                    text-align:left;
                }               
            }
        }
            
       .no-button {
           display:flex;
           flex-direction:column;
           justify-content:center;
           align-items:center;
           width:200px;
           height:26px;
           background:#E51670;
           border-radius:8px
           padding:12px;
           color:#FFF;
           font-size:18px;
           margin-top:300px;
           cursor: pointer
       }
`

export default DeleteContainer;
