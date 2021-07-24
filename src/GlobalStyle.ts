import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
   }


   button, input{
     border: none;
     outline: none;
     
   }

   button{
     cursor: pointer;
   }
`;

export default GlobalStyle;
