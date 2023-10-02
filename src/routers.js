import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Páginas

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import Pix from "./pages/pix";
import Emprestimo from "./pages/emprestimo";
import Transacoes from "./pages/transacoes";
import MeuPerfil from "./pages/meuPerfil";

const Stack = createStackNavigator()

export default function Routers({ navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login - Clean Bank', headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home - Clean Bank', headerShown: false }}
                />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ title: 'Cadastro - Clean Bank', headerShown: false }}
                />
                <Stack.Screen
                    name="Pix"
                    component={Pix}
                    options={{ title: 'Pix - Clean Bank', headerShown: false }}
                />
                <Stack.Screen
                    name="Emprestimo"
                    component={Emprestimo}
                    options={{ title: 'Empréstimo - Clean Bank', headerShown: false }}
                />
                <Stack.Screen
                    name="Transacoes"
                    component={Transacoes}
                    options={{ title: 'Transações - Clean Bank', headerShown: false }}
                />
                <Stack.Screen
                    name="Perfil"
                    component={MeuPerfil}
                    options={{ title: 'Meu perfil - Clean Bank', headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
