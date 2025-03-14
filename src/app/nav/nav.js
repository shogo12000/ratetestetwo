const { default: Link } = require("next/link")


const nav = ({ children }) => {
    return (
        <>
            <nav className="flex gap-5">
                <Link href="/">Home</Link>
                <Link href="/pageOne">pageOne</Link>
                <Link href="/pageTwo">pageTwo</Link>
            </nav>
            {children}
        </>
    )
}

export default nav;