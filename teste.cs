using System;

class Program{
    static void Main(){
        const int maxFuncionarios = 5;

        for (int i = 1; i <= maxFuncionarios; i++){
            Console.WriteLine($"\n=== Cadastro do Funcionário {i} ===");

            Console.Write("Nome: ");
            string nome = Console.ReadLine();

            Console.Write("ID: ");
            string id = Console.ReadLine();

            double somaNotas = 0;

            for (int j = 1; j <= 3; j++){
                Console.Write($"Digite a nota {j} (0 a 10): ");
                double nota = double.Parse(Console.ReadLine());

                if (nota < 0 || nota > 10){
                    Console.WriteLine("Nota inválida! Digite novamente.");
                    j--;
                    continue;
                }

                somaNotas += nota;
            }

            double media = somaNotas / 3;
            string classificacao;

            if (media >= 9){
                classificacao = "Excelente";
            }
            else if (media >= 7){
                classificacao = "Bom";
            }
            else if (media >= 5){
                classificacao = "Regular";
            } else {
                classificacao = "Insuficiente";
            }

            Console.WriteLine($"\n--- Resultado do Funcionário {i} ---");
            Console.WriteLine($"Nome: {nome}");
            Console.WriteLine($"ID: {id}");
            Console.WriteLine($"Média: {media:F2}");
            Console.WriteLine($"Classificação: {classificacao}");
        }

        Console.WriteLine("\nCadastro e avaliação concluídos!");
    }
}