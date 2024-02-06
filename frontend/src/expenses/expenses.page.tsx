import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useExpensesState } from "./expenses.state";
import { useNavigate, useParams } from "react-router-dom";
import { Expenses } from "@Api/users.api";
import React, { useEffect, useState } from "react";
import { ExpenseType } from "@Api/expenses.api";
import axios from "axios";

export function ExpensesPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { getUserExpensesQuery, saveUserExpenseMutation } = useExpensesState(Number(userId));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('Success!');

  const expenses = getUserExpensesQuery?.data?.reduce(
    (acc, { type, amount }: Expenses) => {
      acc[type] = Number(amount.toFixed(2));

      return acc;
    },
    {
      coffee: 0,
      food: 0,
      alcohol: 0,
    }
  );

  const [formData, setFormData] = useState({
    coffee: 0,
    food: 0,
    alcohol: 0,
  });

  useEffect(() => {
    if (expenses) {
      setFormData(expenses);
    }
  }, [getUserExpensesQuery.isLoading]);

  const saveExpense = async (type: ExpenseType, amount: number) => {
    try {
      await saveUserExpenseMutation.mutateAsync({
        type,
        amount
      })
      setSnackbarMessage('Success!')
      setSnackbarType('success')
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarType('error')
      if (axios.isAxiosError(err)) {
        setSnackbarMessage(err?.response?.data?.message)
      } else {
        setSnackbarMessage('Something went wrong!')
      }
      setOpenSnackbar(true);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <Button onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </Button>
        <h1>How much did I spend today?</h1>
      </Box>
      <List>
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              textAlign: "right",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: 50,
              }}
            >
              <ListItemIcon>
                <CoffeeIcon />
              </ListItemIcon>
              <span>Coffee</span>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                id="coffeeAmount"
                label="Amount"
                variant="filled"
                type="number"
                value={formData?.coffee}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({
                    ...formData,
                    coffee: Number(event.target.value),
                  });
                }}
              />
              <Button
                sx={{
                  marginLeft: "5px",
                  paddingLeft: 1,
                  paddingRight: 1,
                  minWidth: 0,
                }}
                onClick={async () => {
                  await saveExpense(ExpenseType.COFFEE, formData.coffee)
                }}
              >
                <CheckIcon />
              </Button>
            </Box>
          </Box>
        </ListItem>
        <Divider />
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              textAlign: "right",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: 50,
              }}
            >
              <ListItemIcon>
                <LunchDiningIcon />
              </ListItemIcon>
              <span>Food</span>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                id="coffeeAmount"
                label="Amount"
                variant="filled"
                value={formData?.food}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({
                    ...formData,
                    food: Number(event.target.value),
                  });
                }}
              />
              <Button
                sx={{
                  marginLeft: "5px",
                  paddingLeft: 1,
                  paddingRight: 1,
                  minWidth: 0,
                }}
                onClick={async () => {
                  await saveExpense(ExpenseType.FOOD, formData.food)
                }}
              >
                <CheckIcon />
              </Button>
            </Box>
          </Box>
        </ListItem>
        <Divider />
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              textAlign: "right",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: 50,
              }}
            >
              <ListItemIcon>
                <LocalBarIcon />
              </ListItemIcon>
              <span>Alcohol</span>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                id="coffeeAmount"
                label="Amount"
                variant="filled"
                value={formData?.alcohol}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormData({
                    ...formData,
                    alcohol: Number(event.target.value),
                  });
                }}
              />
              <Button
                sx={{
                  marginLeft: "5px",
                  paddingLeft: 1,
                  paddingRight: 1,
                  minWidth: 0,
                }}
                onClick={async () => {
                  await saveExpense(ExpenseType.ALCOHOL, formData.food)
                }}
              >
                <CheckIcon />
              </Button>
            </Box>
          </Box>
        </ListItem>
      </List>
      <Snackbar
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity={snackbarType as AlertColor}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
