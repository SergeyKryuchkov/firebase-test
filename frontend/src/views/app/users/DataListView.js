import React from "react";
import { Card, Button, Input } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

const DataListView = ({ user, handleFirestoreInputChange, handleDatabaseInputChange, sendFirestore, sendDatabase, user: { firestoreValue, databaseValue } }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <Card className="d-flex flex-row">
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <div className="w-15 w-sm-100 d-flex flex-row">
              <p className="list-item-heading mb-1 truncate mr-2">
                {user.email}
              </p>
            </div>

            <div className="w-40 d-flex flex-row justify-content-around">
              <Input className='w-50' type="number" name={`input-firestore-${user.id}`} value={(firestoreValue) ? firestoreValue : ''} onChange={(e) => handleFirestoreInputChange(e.target.value, user)} />
              <Button onClick={() => sendFirestore(user)}>Send Firestore</Button>
            </div>

            <div className="w-40 d-flex flex-row justify-content-around">
              <Input className='w-50' type="number" name={`input-database-${user.id}`} value={(databaseValue) ? databaseValue : ''} onChange={(e) => handleDatabaseInputChange(e.target.value, user)} />
              <Button onClick={() => sendDatabase(user)}>Send Database</Button>
            </div>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(DataListView);
