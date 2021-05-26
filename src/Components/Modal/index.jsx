import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MODAL_PARENT_ID, useModalContext } from '../../lib/global/ModalContext'
import useExtAlert from '../../lib/hooks/useExtAltert'
import CustomScrollBar from '../CustomScrollBar'
import { IconButton } from '../helpers'
import ExitIcon from '../../Icons/ExitIcon'

const portalToParent = (element, id) => {
    const parent = document.querySelector(`#${MODAL_PARENT_ID}`)

    if (parent) {
        return createPortal(element, parent, id)
    }

    return element
}

const Modal = props => {
    const { modal, closeModal } = useModalContext()
    const [show, setShow] = useState(false)
    const spring = useSpring({
        to: async next => {
            if (modal === props.id) {
                setShow(true)
                await next({ opacity: 1, transform: 'translate(0%, 0%)' })
                return
            }

            await next({ opacity: 0, transform: 'translate(0%, 20%)' })
            setShow(false)
        },
    })

    const ref = useExtAlert(() => {
        closeModal()
    })

    if (!show) {
        return null
    }

    return portalToParent(
        <animated.div style={{ opacity: spring.opacity }} className="modal">
            <CustomScrollBar
                height={window.innerHeight}
                autoHeight
                autoHeightMin={window.innerHeight}
            >

                <animated.div style={spring} ref={ref} className="modal-body">
                    <IconButton onClick={closeModal} className="modal-close">
                        <ExitIcon />
                    </IconButton>
                    <div className="modal-body__title">
                        <h2>{props.title}</h2>
                    </div>
                    <div className="modal-body__content">{props.children}</div>
                </animated.div>

            </CustomScrollBar>
        </animated.div>,
        props.id,
    )
}

export default Modal