import { useState } from "react";
import { PageHeader } from "../../Components/PageHeader";
import { useAppContext } from "../../Context/AppContext";
import { isAdminLoggedIn } from "../../helper/auth";

// Report Creation => Cards View
export function CreatedURlsCardReport() {
    const { urlList, loggedInUser } = useAppContext();
    const isAdmin = isAdminLoggedIn();
    const currentDate = new Date().toJSON().slice(0, 10);
    const [ searchShortName, setSearchShortName ] = useState("");
    const [ createdFromDate, setCreatedFromDate ] = useState("");
    const [ createdToDate, setCreatedToDate ] = useState(currentDate);

    // Report Filters, Clear button handling
    function clearFilter() {
        setSearchShortName("");
        setCreatedFromDate("");
        setCreatedToDate(currentDate);
    }
    return (
        <>
            <PageHeader>Short URLs List - Table View</PageHeader>
            <div className="m-2 flex flex-wrap gap-2">
                <div className="flex gap-1">
                    <label for="searchShortName">SearchShortNameURL</label>
                    <input 
                        type="text"
                        className="border-2 border-rose-300"
                        id="searchShortName"
                        name="searchShortName"
                        value={searchShortName}
                        onChange={(e) => setSearchShortName(e.target.value)}
                    />
                </div>
                <div className="flex gap-1">
                    <label for="createdFromDate">CreatedDate &gt;=</label>
                    <input 
                        type="date"
                        className="border-2 border-rose-300"
                        id="createdFromDate"
                        name="createdFromDate"
                        value={createdFromDate}
                        onChange={(e) => setCreatedFromDate(e.target.value)}
                        placeholder="YYYY-MM-DD"
                    />
                </div>
                <div className="flex gap-1">
                    <label for="createdToDate"> &lt;=</label>
                    <input 
                        type="date"
                        className="border-2 border-rose-300"
                        id="createdToDate"
                        name="createdToDate"
                        value={createdToDate}
                        onChange={(e) => setCreatedToDate(e.target.value)}
                        placeholder="YYYY-MM-DD"
                        min={createdFromDate}
                        max={currentDate}
                    />
                </div>
                <button className="" onClick={clearFilter}>ClearFilter</button>
            </div>
            <div className="card-container">
            {
                isAdmin ?
                (
                    urlList
                    .filter ( (urldata) => (
                        (urldata.shortname
                            .toLowerCase()
                            .substr(0, searchShortName.length) === searchShortName.toLowerCase()
                        )
                        &&
                        (urldata.date >= createdFromDate)
                        &&
                        (urldata.date <= createdToDate)
                    )
                    )
                    .map((urldata, index) => {
                        return <UrlCard key={index} urldata={urldata} loggedInUser={loggedInUser} />
                    })
                )
                :
                (
                    urlList
                    .filter ( (urldata) => (
                        (urldata.userId.userName === loggedInUser.userName) 
                        && 
                        (urldata.shortname
                            .toLowerCase()
                            .substr(0, searchShortName.length) === searchShortName.toLowerCase()
                        )
                        &&
                        (urldata.date >= createdFromDate)
                        &&
                        (urldata.date <= createdToDate)
                    )
                    )
                    .map((urldata, index) => {
                        return <UrlCard key={index} urldata={urldata} loggedInUser={loggedInUser} />
                    })
                )
            }
            </div>
        </>
    )
};

// Card Creation
function UrlCard({ urldata, loggedInUser }) {
    return (
        <div className="flex flex-col gap-4 border-2 m-2 p-4 border-rose-200 shadow-md shadow-pink-200 bg-pink-100">
            <div className="flex justify-between">
                {
                 loggedInUser.isAdmin ? 
                (       
                    <label>UserName - {urldata.userId.userName}</label>
                )
                :
                ("")
                }
                <label>CreatedDate - {urldata.date}</label>
            </div>
            <hr className="border-rose-400"/>
            <div>
                <label>LongURL - </label>
                <a href={urldata.longUrl} className="text-blue-600">{urldata.longUrl}</a>
            </div>
            <div>                
                <label>ShortURL - </label>
                <a href={urldata.shortUrl}  className="text-blue-600">{urldata.shortUrl}</a>
            </div>
        </div>
    )
};

