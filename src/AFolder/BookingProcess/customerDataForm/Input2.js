import React, {useState, forwardRef} from "react";
import PropTypes from "prop-types";

const Input2 = ({
                    placeholder,
                    leftIcon,
                    rightIcon,
                    value,
                    onClick,
                    smallLeftIcon,
                    rightIconClick,
                    onFocus,
                    onBlur,
                    customRef,
                    error,
                    ...rest
                }) => {
    const [focused, setFocused] = useState(false);
    const LeftIcon = leftIcon;
    const RightIcon = rightIcon;

    const onInputFocus = () => {
        setFocused(true);
        if (onFocus) onFocus();
    };

    const onInputBlur = () => {
        setFocused(false);
        if (onBlur) onBlur();
    };

    return (
        <div
            onClick={onClick}
            // className={[
            //     classes.Wrapper,
            //     smallLeftIcon ? classes.smallLeftIcon : null,
            //     focused ? classes.focused : null,
            //     error ? classes.error : null,
            // ].join(" ")}
        >
            {leftIcon ? <LeftIcon/> : null}
            <input
                className={`block w-full peer placeholder-transparent bg-white             
          dark:bg-neutral-900 rounded-2xl text-sm font-normal h-12 px-4 py-2
           focus:ring focus:ring-opacity-50  dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 focus:ring-primary-200 focus:border-primary-300
           ${false ? "border-red-500" : "dark:border-neutral-700 border-neutral-200"}
          `}
                {...rest}
                onBlur={onInputBlur}
                onFocus={onInputFocus}
                // value={value}
                placeholder={error ? error : placeholder}
                ref={customRef}
            />
            {rightIcon ? <RightIcon style={rightIconClick ? {cursor: "pointer"} : {}} onClick={rightIconClick}/> : null}
        </div>
    );
};

Input2.propTypes = {
    placeholder: PropTypes.string,
    rightIcon: PropTypes.any,
    leftIcon: PropTypes.any,
};

const InputWithRef = forwardRef((props, ref) => {
    return <Input2 {...props} customRef={ref}/>;
});

export default Input2;

export {InputWithRef};
