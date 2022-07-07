import "./src/index.css";

export const onInitialClientRender = () => {
  setTimeout(function () {
    document.getElementById("___loader").style.display = "none";
  }, 500);
};
