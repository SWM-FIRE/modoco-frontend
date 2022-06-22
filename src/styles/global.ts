import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body {
  font-size: 62.5%;
  padding: 0;
  margin: 0;
  scroll-behavior: smooth;
  background-color: #121212;
}
a {
  color: inherit;
  text-decoration: none;
}
* {
  box-sizing: border-box;
}
body,
button,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
input,
legend,
li,
ol,
p,
select,
table,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
table,
textarea {
  font-size: 12px;
  line-height: 16px;
  color: #202020;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  line-height: inherit;
}
textarea {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: transparent;
  border: 0;
  word-break: keep-all;
  word-wrap: break-word;
}
button,
input {
  -webkit-border-radius: 0;
  border-radius: 0;
  border: 0;
}
button {
  background-color: transparent;
}
fieldset,
img {
  border: 0;
}
img {
  vertical-align: top;
}
ol,
ul {
  list-style: none;
}
address,
em {
  font-style: normal;
}
a {
  color: inherit;
  text-decoration: none;
  font-family: inherit;
}
a:hover {
  text-decoration: underline;
}
iframe {
  overflow: hidden;
  margin: 0;
  border: 0;
  padding: 0;
  vertical-align: top;
}
mark {
  background-color: transparent;
}
i {
  font-style: normal;
}

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
::-webkit-scrollbar-track {
    background: var(--lightestgrey);
  }
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default GlobalStyle;
