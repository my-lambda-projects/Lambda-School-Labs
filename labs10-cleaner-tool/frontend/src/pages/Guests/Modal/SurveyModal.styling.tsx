import styled from '@emotion/styled';

export const ModalContainer = styled.div`
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    position: fixed; 
    z-index: 1;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0, 0.4); 
    overflow-x: hidden; 
    .modal-content-container{
        padding-bottom: 1rem;
        display: grid;
        grid-template-rows: min-content  5fr 1fr;
        grid-template-columns: 50% 50%;
        grid-gap: 0px;
        grid-template-areas:
            'title title'
            'checkBoxList checkBoxList'
            'submitButton closeButton'
        ;
        border: var(--border);
        width: 55%;
        height: 40%;
        background-color: var(--color-bg-secondary);
        h3 {
            grid-area: title;
            border-bottom: var(--border);
            background-color:var(--color-bg-main);
            font-size: var(--header-font-size-secondary);
            padding: 0.5rem 1.5rem;
            margin: 0;
            color: var(--color-text-accent-light);
            width: 100%;
        };
        form {
            height: 100%;
            grid-area: checkBoxList;
            display: flex;
            flex-direction: column;
            overflow-y: scroll;
            div {
                width: 100%;
                height: 56px;
                div {
                    display: flex;
                    width: 100%;
                    padding: 0 16px;
                    border-bottom: var(--border);
                    input[type="checkbox"] {
                        display: none;
                    }
                    label {
                        width: 100%;
                        position: relative;
                        display: flex;
                        align-self: center;
                        height: 24px;
                        padding-left: 56px;
                        user-select: none;
                        line-height: 24px;
                    }
                    label::before, label::after {
                        position: absolute;
                        content: "";
                        display: table-cell;
                        vertical-align: middle;
                    }
                    /* Outer box */
                    label::before {
                        height: 18px;
                        width: 18px;
                        border: 3px solid var(--color-border-strong);
                        border-radius: 3px;
                        left: 0px;
                    }
                    /* Checkmark */
                    label::after {
                        height: 5px;
                        width: 16px;
                        border-left: 2px solid var(--color-bg-secondary);
                        border-bottom: 2px solid var(--color-bg-secondary);
                        transform: rotate(-52deg);
                        left: 3px;
                        top: 7px;
                    }
                    input + label::after {
                        content: none;
                    }
                    input:checked + label::after {
                        content: "";
                    }
                    input:checked + label::before {
                        background: var(--color-bg-accent);
                    }
                    input:focus + label::before {
                        outline: rgb(59, 153, 252) auto 5px;
                    }
                }
            };
        };
        button {
            grid-area: closeButton;
            justify-self: start;
            align-self: center;
            margin-right: 40px;
            @media only screen and (max-width: 900px){
                width: 100px;
            }
            @media only screen and (max-width: 550px){
                margin-right: 10px;
            }
        }
        span {
            justify-self: end;
            align-self: center;
            grid-area: submitButton;
            padding: 0;
            margin-left: 40px;
            button {
                border: rgba(0,0,0,0) solid 1.5px;
            }
        }
}`