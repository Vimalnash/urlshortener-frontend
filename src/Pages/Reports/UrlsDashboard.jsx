import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../Components/PageHeader";
import { useAppContext } from "../../Context/AppContext";

// Report -> Dashboard View
export function UrlsDashboard() {
    const { urlCount } = useAppContext();
    return (
        <>
            <PageHeader>DashBoard - Total - Created ShortURLs </PageHeader>
            <UrlCard urlCount={urlCount} />
        </>
    )
}

// Card Creation
function UrlCard({ urlCount }) {
    const navigate = useNavigate();
    const { 
        setCreatedFromDate, setCreatedToDate
    } = useAppContext();

    const currentMonth = new Date().toJSON().slice(5, 7)
    const currentYear = new Date().toJSON().slice(0, 4)
    const todayDate = new Date().toJSON().slice(8, 10)

    return (
        <>
            <div>Help - Click to backtrack</div>
            <div className="flex flex-col justify-center items-center">
                <div 
                    className="w-60 flex flex-col items-center text-center rounded-full gap-4 border-2 m-2 p-10 border-rose-200 shadow-md shadow-pink-200 bg-pink-100 cursor-pointer"
                    onClick={() => {
                        navigate("/user/savedurlstableview");
                        setCreatedFromDate(`${currentYear}-${currentMonth}-${todayDate}`);
                        setCreatedToDate(`${currentYear}-${currentMonth}-${todayDate}`);

                    }}
                >
                    <label className="cursor-pointer">Today</label>
                    <label className="text-blue-600 cursor-pointer">{urlCount.shortUrlTodayCount}</label>
                </div>

                <div 
                    className="w-60 flex flex-col items-center text-center rounded-full gap-4 border-2 m-2 p-10 border-rose-200 shadow-md shadow-pink-200 bg-pink-100 cursor-pointer"
                    onClick={() => {
                        navigate("/user/savedurlstableview");
                        setCreatedFromDate(`${currentYear}-${currentMonth}-01`);
                        setCreatedToDate(`${currentYear}-${currentMonth}-31`);
                    }}
                >
                    <label className="cursor-pointer">ThisMonth</label>
                    <label className="text-blue-600 cursor-pointer">{urlCount.shortUrlThisMonthCount}</label>
                </div>
                <div 
                    className="w-60 flex flex-col items-center text-center rounded-full gap-4 border-2 m-2 p-10 border-rose-200 shadow-md shadow-pink-200 bg-pink-100 cursor-pointer"
                    onClick={() => {
                        navigate("/user/savedurlstableview");
                        setCreatedFromDate("");
                        setCreatedToDate(`${currentYear}-${currentMonth}-${todayDate}`);
                    }}
                >
                    <label className="cursor-pointer">TotalCreated</label>
                    <label className="text-blue-600 cursor-pointer">{urlCount.shortUrlListCount}</label>
                </div>
                {/* <div class="col-sm-6 col-lg-3 mb-6 mb-sm-0 px-6 text-center">
                    <div class="counterup fs-56 lh-1 mb-3 pt-2" data-start="0" data-end="230000" data-decimals="0" data-duration="0" data-separator="">230000</div>
                    <div class="text-uppercase fs-13 lh-184 letter-spacing-163">Withdrawal count</div>
                </div> */}
            </div>
        </>
    )
};

