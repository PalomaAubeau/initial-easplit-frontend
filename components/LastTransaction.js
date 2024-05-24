import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { PATH_lastTransaction } from "../utils/path";

// Composant Transaction
const Transaction = ({ name, transactionText, transactionDescription, amount }) => {
  return (
    <View style={styles.transactionContainer}>
      <View> 
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDescription}>
        {transactionDescription}
      </Text>
      </View>
      <Text style={styles.transactionAmount}>{amount} €</Text>
    </View>
  );
};

// Composant LastTransactions
const LastTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.value);
  const token = user.token;
  console.log('dans le composant token trouvé', token);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${PATH_lastTransaction}/transactions/userTransactions/${token}`
        );
    
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
    
        const data = await response.json();
        console.log('data des transactions', data);

        const formattedData = data.transactions.map(transaction => {
          let transactionText = "";
          let transactionDescription = "";
            console.log('transactions dans le map', transaction)
            console.log('transactions dans le map du name', transaction.name)
          if (transaction.type === "refund") {
            transactionText = `Remboursement +${transaction.name}`;
            transactionDescription = "Remboursement clôture événement";
          } else if (transaction.type === "reload") {
            transactionText = "Rechargement de mon compte";
            transactionDescription = "Rechargement de mon compte";
          } else if (transaction.type === "payment") {
            transactionText = `Paiement pour l'évènement ${transaction.name}`;
            transactionDescription = "Participation";
            
          }

          return {
            ...transaction,
            transactionText,
            transactionDescription,
          };
        });

        setTransactions(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Échec de la récupération des transactions", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Utilisation du token pour la récupération des transactions ???
console.log('transaction formaté', transactions)
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4E3CBB" />
      ) : (
        <FlatList
          data={transactions.slice(0,2)}
          renderItem={({ item }) => {
          
              return (
                <Transaction
                  name={item.name}
                  transactionText={item.transactionText}
                  transactionDescription={item.transactionDescription}
                  amount={item.amount}
                />
              );
           
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: "#FFFFFF",
    height : 60,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4E3CBB",
  },
  transactionDescription: {
    fontSize: 14,
    color: "#888",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff69b4",
    textAlign: "right",
  },
});

export default LastTransactions;
