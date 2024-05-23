import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

// Composant Transaction
const Transaction = ({ name, type, amount }) => {
  const getTransactionText = () => {
    switch (type) {
      case 'refund':
        return `Remboursement +${name}`;
      case 'reload':
        return 'Rechargement de mon compte';
      case 'payment':
        return `Paiement pour l'évènement ${name}`;
      default:
        return '';
    }
  };

  const getTransactionDescription = () => {
    switch (type) {
      case 'refund':
        return 'Remboursement clôture événement';
      case 'reload':
        return 'Rechargement de mon compte';
      case 'payment':
        return `Participation`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.transactionContainer}>
      <Text style={styles.transactionText}>{getTransactionText()}</Text>
      <Text style={styles.transactionDescription}>{getTransactionDescription()}</Text>
      <Text style={styles.transactionAmount}>{amount} €</Text>
    </View>
  );
};

// Composant LastTransactions
const LastTransactions = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Récupération des transactions de l'utilisateur
        const response = await fetch(`http://localhost:3000/user/${userId}/transactions`);
        const data = await response.json();
        
        if (data.response) {
          const transactionDetails = await Promise.all(
            data.transactions.map(async (transaction) => {
              const res = await fetch(`http://localhost:3000/${transaction._id}`);
              const transactionData = await res.json();
              return transactionData.response ? transactionData.transaction : null;
            })
          );
          setTransactions(transactionDetails.filter(Boolean)); // Filtre les valeurs nulles
        } else {
          console.error(data.error);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MES DERNIÈRES TRANSACTIONS</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            name={item.eventId.name}
            type={item.type}
            amount={item.amount}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff69b4',
    textAlign: 'right',
  },
});

export default LastTransactions;
