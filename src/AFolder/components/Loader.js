import React, {useEffect} from "react"
import loadingSpinner from "../../assets/loadingSpinner.svg"

const Loader = () => {

    // useEffect(() => {
    //     console.log("##########")
    //
    //     try {
    //         const element = document.getElementById("___loader");
    //         if (element) element.parentNode.removeChild(element)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // })

    return (
        <div
            key={`loader`}
            id="___loader"
            style={{
                alignItems: "center",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
            }}
        >
            <img
                src={loadingSpinner}
                alt="loading spinner"
                width="150"
                height="150"
            />
        </div>
    )
}
export default Loader;