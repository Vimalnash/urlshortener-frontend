import { MenuBar } from "./menubar";

// Display Page Titles
export function PageHeader({children}) {
    return (
        <>
            <MenuBar />
            <div className="m-2 p-2 text-2xl text-center font-semibold bg-red-100">
                {children}
            </div>
        </>
    )
};
