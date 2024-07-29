
import { PageHeader } from "../../Components/PageHeader";
import { useAppContext } from "../../Context/AppContext";
import { isAdminLoggedIn } from "../../helper/auth";

// Report Creation -> Table View
export function CreatedUrlsReportTable() {
    const { urlList, loggedInUser, 
        searchShortName, setSearchShortName,
        createdFromDate, setCreatedFromDate,
        createdToDate, setCreatedToDate,
        currentDate 
    } = useAppContext();

    // Clear Filter button handling
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
            
            <table cellPadding={6} cellSpacing={6} className="w-full text-center border-collapse border border-pink-400">
                <thead>
                    <tr>
                        {
                        loggedInUser.isAdmin ? (<th className="border border-pink-400">UserName</th>) : ("")
                        } 
                        <th className="border border-pink-400">CreatedDate</th>
                        <th className="border border-pink-400">ShortURL</th>
                        <th className="border border-pink-400">LongURL</th>
                    </tr>
                </thead>
                {
                    isAdminLoggedIn() ?
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
                            return <UrlCard key={index} urldata = {urldata} loggedInUser={loggedInUser}/>
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
                            return <UrlCard key={index} urldata = {urldata} loggedInUser={loggedInUser}/>
                        })
                    )
                }
            </table>
        </>
    )
}

// Table Body Dynamically creation
function UrlCard({urldata, loggedInUser}) {
    return (
            <>
            <tbody>
                <tr>
                    {
                        loggedInUser.isAdmin ? (<td className="border border-pink-400"> {urldata.userId.userName} </td>) : ("")
                    }
                    <td className="w-100 border border-pink-400">{urldata.date}</td>
                    <td className="w-100 border border-pink-400"><a href={urldata.shortUrl} className="text-blue-600">{urldata.shortUrl}</a></td>
                    <td className="border border-pink-400"><a href={urldata.longUrl} className="text-blue-600">{urldata.longUrl}</a></td>
                </tr>
            </tbody>
            </>
    )
}