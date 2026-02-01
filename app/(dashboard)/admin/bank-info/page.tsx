"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { getAllBanks } from "@/app/services/bank.service";

const BankInfoManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectBank, setSelectBank] = useState<Bank | null> (null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const fetchBanks = async () => {
    try {
        const data = await getAllBanks();
        setBanks(data);
    } catch (error) {
        console.error("Failed to fetch bank data", error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedBank(null);
  };

  const handlEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handlDelete = (id: string) => {
    setSelectedBank(id);
    setIsModalOpen(true);
  };

  const handlDeletConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
        await deleteBank(bankToDeleteId);
        toast.success("Bank info deleted succesfully");
        setBankToDeleteId("");
        setIsDeleteModalOpen(false);
        fetchBanks();
    } catch (error) {
        console.error("Failed to delete bank info");
        toast.error("Failed to delete bank info");
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="font-bold text-2xl">Bank Info Management</h1>
                <p className="opacity-50">
                    Manage destination accounts for customer transfers.
                </p>
            </div>
            <Button className="rounded-lg" onClick={() =>setIsModalOpen(true)}>
                <FiPlus size={24} />
                Add Bank Account
            </Button>
            </div>
            <BankInfoList banks={banks} onEdit={handlEdit} onDelete={handleDelete} />
            <BankInfoModal 
            isOpen={isModalOpen}
            onSuccess={fetchBanks}
            onClose={handleCloseModal}
            bank={selectedBank} />
            <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleDeleteConfirm} />
        </div> 
    );
};

export default BankInfoManagement;