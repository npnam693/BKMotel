import styles from './style.module.css'
import Tippy from '@tippyjs/react/headless';

function Menu({children}) {
    return (
        <Tippy
        render={attrs => (
            <div className="box" tabIndex="-1" {...attrs}>
                My tippy box
            </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
