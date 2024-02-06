import { useDashboardState } from "@Dashboard/dashboard.state";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Button, List, ListItem, ListItemIcon } from "@mui/material";
import { ExpenseType } from "@Api/expenses.api";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const navigate = useNavigate()
  const {
    getUsersQuery,
    getAverageExpensesQuery,
    getAverageExpensesPerWeekQuery,
    selectedUser,
    setSelectedUser,
  } = useDashboardState();

  useEffect(() => {
    getAverageExpensesQuery.refetch();
  }, [selectedUser]);

  const average = getAverageExpensesQuery?.data?.reduce(
    (acc, { type, amount }: { type: ExpenseType; amount: number }) => {
      acc[type] = Number(amount.toFixed(2));

      return acc;
    },
    {
      coffee: 0,
      food: 0,
      alcohol: 0,
    }
  );

  const averagePerWeek = getAverageExpensesPerWeekQuery?.data?.reduce(
    (acc, { type, amount }: { type: ExpenseType; amount: number }) => {
      acc[type] = Number(amount.toFixed(2));

      return acc;
    },
    {
      coffee: 0,
      food: 0,
      alcohol: 0,
    }
  );

  const getDifferenceByPercentage = (
    averageAmount: number,
    averageAmountPerWeek: number
  ) => {
    if (averageAmount === 0 && averageAmountPerWeek === 0) return;
    const percentage = Number(
      (((averageAmountPerWeek - averageAmount) / averageAmount) * 100).toFixed(
        2
      )
    );

    if (percentage === 0) return

    return percentage > 0 ? (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
          {`${percentage}% above average`}
        </Box>
      </>
    ) : (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemIcon>
            <ArrowDownwardIcon />
          </ListItemIcon>
          {`${Math.abs(percentage)}% below average`}
        </Box>
      </>
    );
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 600, width: "100%" }}>
      <FormControl fullWidth variant="filled">
        <InputLabel id="userId">User</InputLabel>
        <Select
          labelId="userId"
          value={selectedUser}
          onChange={(event) => {
            setSelectedUser(event.target.value as number);
          }}
        >
          <MenuItem key={0} disabled value={0}>
            Select User
          </MenuItem>
          {getUsersQuery?.data?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 2
      }}>
      <h1>Am I spending too much?</h1>
      <Button sx={{
        paddingTop: 1
      }} onClick={() => {
        if (!selectedUser) return

        navigate(`/user/${selectedUser}/expenses`)
      }}>Expenses</Button>
      </Box>
      <Box>
        <List>
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
                }}
              >
                <ListItemIcon>
                  <CoffeeIcon />
                </ListItemIcon>
                <span>Coffee</span>
              </Box>
              <Box>
                ${average?.coffee} / week
                <br />
                {getDifferenceByPercentage(
                  average?.coffee || 0,
                  averagePerWeek?.coffee || 0
                )}
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
                }}
              >
                <ListItemIcon>
                  <LunchDiningIcon />
                </ListItemIcon>
                <span>Food</span>
              </Box>
              <Box>
                ${average?.food} / week
                <br />
                {getDifferenceByPercentage(
                  average?.food || 0,
                  averagePerWeek?.food || 0
                )}
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
                }}
              >
                <ListItemIcon>
                  <LocalBarIcon />
                </ListItemIcon>
                <span>Alcohol</span>
              </Box>
              <Box>
                ${average?.alcohol} / week
                <br />
                {getDifferenceByPercentage(
                  average?.alcohol || 0,
                  averagePerWeek?.alcohol || 0
                )}
              </Box>
            </Box>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Box>
  );
}