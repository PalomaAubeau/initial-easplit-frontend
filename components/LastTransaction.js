import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";

// Composant Transaction
const Transaction = ({ name, type, amount }) => {
  const getTransactionText = () => {
    switch (type) {
      case "refund":
        return `Remboursement +${name}`;
      case "reload":
        return "Rechargement de mon compte";
      case "payment":
        return `Paiement pour l'évènement ${name}`;
      default:
        return "";
    }
  };

  const getTransactionDescription = () => {
    switch (type) {
      case "refund":
        return "Remboursement clôture événement";
      case "reload":
        return "Rechargement de mon compte";
      case "payment":
        return `Participation`;
      default:
        return "";
    }
  };

  return (
    <View style={styles.transactionContainer}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDescription}>
        {getTransactionDescription()}
      </Text>
      <Text style={styles.transactionAmount}>{amount} €</Text>
    </View>
  );
};

// Composant LastTransactions
const LastTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.value);
  const userId = user.userId;
  console.log('dans le composant', userId)


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `https://easplit-backend.vercel.app/transactions/userTransactions/${userId}`
        );
    
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.response) {
          const transactionDetails = await Promise.all(
            data.transactions.map(async (transaction) => {
              const res = await fetch(
                `https://easplit-backend.vercel.app/transactions/${transaction._id}`
              );
    
              if (!res.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${res.status}`);
              }
    
              const transactionData = await res.json();
              return transactionData.response
                ? transactionData.transaction
                : null;
            })
          );
          setTransactions(transactionDetails.filter(Boolean)); // Filtre les valeurs nulles
        } else {
          console.error(data.error);
        }
        setLoading(false);
      } catch (error) {
        console.error("Échec de la récupération des transactions", error);
        setLoading(false);
      }
    };
    

    fetchTransactions();
  }, [userId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={transactions}
          renderItem={({ item }) => {
            if (item && item.eventId) {
              return (
                <Transaction
                  name={item.eventId.name}
                  type={item.type}
                  amount={item.amount}
                />
              );
            } else {
              return null; // ou une autre indication d'erreur
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "bold",
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
