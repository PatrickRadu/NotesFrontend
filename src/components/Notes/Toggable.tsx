import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface ToggableProps {
    buttonLabel: string;
    children: any;
    ref: any;
}


const Toggable: React.FC<ToggableProps> = forwardRef((props,ref) => {
        const [visible, setVisible] = useState(false)

        const hideWhenVisible = { display: visible ? 'none' : '' }
        const showWhenVisible = { display: visible ? '' : 'none' }
      
        const toggleVisibility = () => {
          setVisible(!visible)
        }
        useImperativeHandle(ref, () => {
            return {
                toggleVisibility
            }
            })
        return (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
              {props.children}
              <button onClick={toggleVisibility}>cancel</button>
            </div>
          </div>
        )
})

export default Toggable;