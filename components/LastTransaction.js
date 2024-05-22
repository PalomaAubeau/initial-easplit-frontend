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
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDescription}>{getTransactionDescription()}</Text>
      <Text style={styles.transactionAmount}>{amount} €</Text>
    </View>
  );
};

// Composant LastTransactions
const LastTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = 'user_token_here'; // Remplacez par le token réel de l'utilisateur

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Récupération des transactions de l'utilisateur
        const response = await fetch(`http://localhost:3000/transactions/${token}`);
        const data = await response.json();
        
        if (data.status === 200) {
          setTransactions(data.data);
        } else {
          console.error(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

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
            name={item.name}
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
  transactionName: {
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
