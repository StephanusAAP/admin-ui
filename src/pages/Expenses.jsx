import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import CardExpense from "../components/Fragments/CardExpense";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { AuthContext } from "../context/authContext";

function ExpensesPage() {
  const { logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);


      const token = localStorage.getItem("token"); 


      const response = await axios.get("https://jwt-auth-eight-neon.vercel.app/expenses", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 Ini "Kunci" agar server mau membuka pintu
        },
      });
      
      setExpenses(response.data.data || response.data);
    } catch (err) {
      console.error("Gagal mengambil data expenses:", err);
      if (err.response && err.response.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-01 mb-2">Expenses Comparison</h1>
      </div>


      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[50vh] text-primary">
          <CircularProgress color="inherit" size={50} enableTrackSlot />
          <div className="mt-2 text-sm font-bold">Loading Data</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map((expenseItem, index) => (
            <CardExpense key={index} data={expenseItem} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default ExpensesPage;