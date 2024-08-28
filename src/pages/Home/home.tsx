import { Transaction } from "@interfaces/index";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomCard } from "../../components/Card";
import { SimpleBarChartComponent } from "../../components/Charts/Bar/index";
import { DoubleBarChartComponent } from "../../components/Charts/DoubleBar";
import { PieChartComponent } from "../../components/Charts/Pie";
import { DatePicker } from "../../components/DatePicker";
import { Select } from "../../components/Select";
import SideMenu from "../../components/SideMenu/index";
import { accounts } from "../../consts/accounts";
import { industries } from "../../consts/industries";
import { states } from "../../consts/states";
import api from "@services/api";

export function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const menuItems = [{ text: "Home", url: "/home" }];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.data.getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const totalAmountOfTransactions = api.data.calculateTotalAmount(transactions);
  const totalOfTransactions = api.data.calculateTotalTransactions(transactions);
  const totalDeposits = api.data.calculateTotalDeposits(transactions);
  const totalWithdraws = api.data.calculateTotalWithdrawals(transactions);
  const totalIndustriesCategories = api.data.calculateUniqueIndustriesCount(transactions);

  const transactionByIndustryData = api.data.calculateTransactionByIndustry(transactions);
  const transactionByStateData = api.data.calculateTransactionByState(transactions);
  const transactionByAccountData = api.data.calculateTransactionByAccount(transactions);
  const totalTypeOfTransactions = api.data.calculateTransactionByMonthYear(transactions);

  return (
    <>
      <SideMenu menuItems={menuItems} />

      <Grid width="100%" height="100%" display="flex" padding="0 3rem 0 3rem" flexDirection="column">
        <Typography variant="h4">Seja bem vindo ao Dashboard</Typography>
        <Typography variant="h6" marginTop="1rem">
          Utilize os filtros abaixo para facilitar a sua análise:
        </Typography>

        <Grid item container spacing={2} marginTop="0.1rem">
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker size="small" label="Filtrar por data" sx={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select size="small" label="Filtrar por contas" options={accounts as []} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select size="small" label="Filtrar por indústrias" options={industries as []} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select size="small" label="Filtrar por estado" options={states as []} />
          </Grid>
        </Grid>

        <Grid item container spacing={2} marginTop="1.5rem">
          <Grid item xs={12} sm={6} md={2.4}>
            <CustomCard title="Total em Transações" value={totalAmountOfTransactions} backgroundColor="#0088FE" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <CustomCard title="Número de Transações" value={`${totalOfTransactions}`} backgroundColor="#FFBB28" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <CustomCard title="Total de depósitos" value={`${totalDeposits}`} backgroundColor="#00C49F" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <CustomCard title="Total de despesa" value={`${totalWithdraws}`} backgroundColor="#FF8042" />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <CustomCard
              title="Categorias de empresa"
              value={`${totalIndustriesCategories}`}
              backgroundColor="#AF69EE"
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2} marginTop="1.5rem">
          <Grid item xs={12} sm={6} md={4}>
            <PieChartComponent data={transactionByIndustryData} title="Distribuição de transações por indústria" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChartComponent data={transactionByStateData} title="Distribuição de transações por estado" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SimpleBarChartComponent
              data={transactionByAccountData}
              title="Total de Transações por Conta"
              dataKey="value"
              xAxisDataKey="name"
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2} marginTop="1.5rem">
          <DoubleBarChartComponent
            data={totalTypeOfTransactions}
            title="Total de depósitos/despesas por Mês/Ano"
            xAxisDataKey="name"
            dataKey="Depositos"
            barDataKeys={["Depositos", "Despesas"]}
            colors={["#0088FE", "#FF8042"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
