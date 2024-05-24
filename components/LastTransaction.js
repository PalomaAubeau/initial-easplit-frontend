import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { PATH_lastTransaction } from "../utils/path";

// Composant Transaction
const Transaction = ({ name, transactionText, transactionDescription, amount, amountSign }) => {
  return (
    <View style={styles.transactionContainer}>
      <View>
        <Text style={styles.transactionName}>{name}</Text>
        <Text style={styles.transactionDescription}>{transactionDescription}</Text>
      </View>
      <Text style={styles.transactionAmount}>
        {amountSign}{amount} €
      </Text>
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
  console.log("controle du path", PATH_lastTransaction);
  
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
        console.log("data des transactions", data);

        const formattedData = data.transactions.map(transaction => {
          let transactionText = "";
          let transactionDescription = "";
          let amountSign = "";

          switch (transaction.type) {
            case "refund":
              transactionText = `Remboursement +${transaction.name}`;
              transactionDescription = "Remboursement clôture événement";
              amountSign = "+";
              break;
            case "reload":
              transactionText = "Rechargement de mon compte";
              transactionDescription = "Rechargement de mon compte";
              amountSign = "+";
              break;
            case "payment":
              transactionText = `Paiement pour l'évènement ${transaction.name}`;
              transactionDescription = "Participation";
              amountSign = "-";
              break;
            case "expense":
              transactionText = `Dépense pour ${transaction.name}`;
              transactionDescription = "Dépense";
              amountSign = "-";
              break;
            default:
              console.log(`Unknown transaction type: ${transaction.type}`);
          }

          return {
            ...transaction,
            transactionText,
            transactionDescription,
            amountSign,
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
  }, [token]);

  console.log("transaction formaté", transactions);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4E3CBB" />
      ) : (
        <FlatList
          data={transactions.slice(0, 2)}
          renderItem={({ item }) => (
            <Transaction
              name={item.name}
              transactionText={item.transactionText}
              transactionDescription={item.transactionDescription}
              amount={item.amount}
              amountSign={item.amountSign}
            />
          )}
          keyExtractor={(item, index) => index.toString()} // Utilisation de l'index comme clé
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    height: 80,
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
