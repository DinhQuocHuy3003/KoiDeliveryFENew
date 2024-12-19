import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import useStore from '../../../app/store';

function AccountManagement() {
    const getAllAccounts = useStore((state) => state.getAllAccounts);

    const accountList = useStore((state) => state.accountList);

    useEffect(() => {
        getAllAccounts();
    }, [])

  return (
    <>
      <ToastContainer />
      <div>
          <>
            <h1 className="section-title">Manage Accounts</h1>

          </>
          <h2 style={{ color: "red" }}>
            You are not authorized to access this page.
          </h2>

        {/* Role Modal */}
      </div>
    </>
  );
}

export default AccountManagement;