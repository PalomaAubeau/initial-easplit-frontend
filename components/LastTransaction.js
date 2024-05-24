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
const Transaction = ({
  name,
  transactionText,
  transactionDescription,
  amount,
}) => {
  return (
    <View style={styles.transactionContainer}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDescription}>
        {transactionDescription}
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
  const token = user.token;
  console.log("dans le composant token trouvé", token);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://192.168.42.130:3000/transactions/userTransactions/${token}`
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        console.log("data des transactions", data);

        const formattedData = data.transactions.map((transaction) => {
          let transactionText = "";
          let transactionDescription = "";

          if (transaction.type === "refund") {
            transactionText = `Remboursement +${transactions.name}`;
            transactionDescription = "Remboursement clôture événement";
          } else if (transaction.type === "reload") {
            transactionText = "Rechargement de mon compte";
            transactionDescription = "Rechargement de mon compte";
          } else if (transaction.type === "payment") {
            transactionText = `Paiement pour l'évènement ${transactions.name}`;
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
  }, [token]); // Utilisation du token pour la récupération des transactions

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4E3CBB" />
      ) : (
        <FlatList
          data={transactions}
          renderItem={({ item }) => {
            if (item && item.eventId) {
              return (
                <Transaction
                  name={item.eventId.name}
                  transactionText={item.transactionText}
                  transactionDescription={item.transactionDescription}
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
};

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
