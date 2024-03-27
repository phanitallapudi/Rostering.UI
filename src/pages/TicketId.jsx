import Header from "../partials/Header";

function TicketId() {

    return(
        <>
        <Header />
        <div className="mt-5 ml-16">
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div className="px-2 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ticket Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about ticket.
        </p>
    </div>
    <div className="border-t border-gray-200">
        <dl>
            <div className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    UID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                963084

                </dd>
            </div>
            <div className="bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Title
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Router Setup
                </dd>
            </div>
            <div className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {/* <div className="bg-green-500 w-14 p-1 rounded-full pl-[10px] pr-[10px]"> */}
                        Open 
                    {/* </div> */}
                </dd>
            </div>
            <div className="bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Assigned To
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Null
                </dd>
            </div>
            <div className="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Priority
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    1
                </dd>
            </div>
            <div className="bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself
                </dd>
            </div>
        </dl>
    </div>
</div>
</div>
        </>
    );
}



export default TicketId;