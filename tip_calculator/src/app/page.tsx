'use client';

import { useState } from "react";

export default function Home() {
  const [bill, setBill] = useState<number | string>("");
  const [tipPercent, setTipPercent] = useState<number>(0);
  const [customTip, setCustomTip] = useState<number | string>("");
  const [people, setPeople] = useState<number | string>(1);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculateTip = () => {
    const billValue = Number(bill);
    const tipValue = customTip ? Number(customTip) : tipPercent;
    const numPeople = Number(people) > 0 ? Number(people) : 1;

    if (billValue > 0 && tipValue >= 0) {
      const tip = (billValue * tipValue) / 100;
      const grandTotal = billValue + tip;
      setTipAmount(tip / numPeople);
      setTotal(grandTotal / numPeople);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl text-black">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          My Tip Calculator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Bill */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bill Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            {/* Tip Percentage */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Tip %
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15, 20, 25].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => {
                      setTipPercent(percent);
                      setCustomTip("");
                    }}
                    className={`py-2 rounded-lg font-medium ${
                      tipPercent === percent && !customTip
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
                {/* Custom Tip */}
                <input
                  type="number"
                  placeholder="Custom"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(e.target.value);
                    setTipPercent(0);
                  }}
                  className="px-2 py-2 border rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Split Between (People)
              </label>
              <input
                type="number"
                min={1}
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateTip}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Calculate
            </button>
          </div>

          {/* Right Side */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 font-medium">Tip per Person:</p>
              <p className="text-xl font-bold text-green-600">
                ${tipAmount.toFixed(2)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 font-medium">Total per Person:</p>
              <p className="text-xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 font-medium">Grand Total:</p>
              <p className="text-xl font-bold text-purple-600">
                ${(Number(total) * (Number(people) || 1)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
