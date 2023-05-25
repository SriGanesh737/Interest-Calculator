import React, { useState } from 'react';

function InterestForm() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [principalAmount, setPrincipalAmount] = useState('');
    const [totalInterest, setTotalInterest] = useState(0);


    function calculateMonths(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        let yearsDiff = end.getFullYear() - start.getFullYear();
        let monthsDiff = end.getMonth() - start.getMonth();
        let daysDiff = end.getDate() - start.getDate();

        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            yearsDiff--;
            monthsDiff += 12;
        }

        const totalMonths = yearsDiff * 12 + monthsDiff;

        // Calculate the remaining days
        const startDateCopy = new Date(start.getTime());
        startDateCopy.setFullYear(start.getFullYear() + yearsDiff);
        startDateCopy.setMonth(start.getMonth() + monthsDiff);
        const remainingTime = end.getTime() - startDateCopy.getTime();
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

        // return { months: totalMonths, days: remainingDays };
        return totalMonths+remainingDays/30;
    }



    const { months, days } = calculateMonths('2023-01-15', '2023-05-25');

    console.log(`Months: ${months}`);
    console.log(`Remaining Days: ${days}`);


    const handleSubmit = (e) => {
        e.preventDefault();


        const calculatedInterest =
            parseFloat(interestRate) * parseFloat(principalAmount) * parseFloat(calculateMonths(startDate,endDate))/100;

        setTotalInterest(calculatedInterest.toFixed(4)); // Store the calculated interest

    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form className="bg-gray-100 p-8 rounded shadow-lg sm:w-2/3 lg:w-1/2" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4 text-center">Interest Calculator</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principalAmount">
                        Principal Amount (in Rupees):
                    </label>
                    <input
                        type="number"
                        id="principalAmount"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                        value={principalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interestRate">
                        Interest Rate (in Rupees per hundred rupees per month):
                    </label>
                    <input
                        type="number"
                        id="interestRate"
                        className="border border-gray-400 rounded px-3 py-2 w-full"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-center mb-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Calculate
                    </button>
                </div>
            </form>
            {totalInterest !== 0 && (
                <div className="bg-green-100 border border-green-400 text-gray-800 px-4 py-2 mt-4 rounded">
                    Calculated Interest: <span className='font-bold text-blue-800'>{totalInterest}</span> Rupees
                    <br/>
                    Total Amount: <span className='font-bold text-blue-800'>{parseFloat(principalAmount) + parseFloat(totalInterest)}</span> Rupees
                </div>
            )}
        </div>
    );
}

export default InterestForm;
