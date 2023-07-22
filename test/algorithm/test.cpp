#include <iostream> 
#include <cstdio> 
#include <bitset>
#include <cctype>
// 使用宏定义使程序更清晰（虽然也没有清晰多少）
#define ALIEN "?y7M#"
#define EARTH "Earth"
char buffer[1010];
std::bitset<1010> matrix[2010]; // matrix[1~n]：增广矩阵，0 位置为常数
int GaussElimination(int n, int m) // n 为未知数个数，m 为方程个数，返回 0 表示多解，否则返回最少用到的方程数 
{
    int ans = -1; // 方程使用数
    for (int i = 1; i <= n; i++) // 循环消去第 i 个元
    {
        int cur = i;
        while (cur <= m && !matrix[cur].test(i))
            cur++;
        if (cur > m) // 第 i 个元的所有系数均为 0，有多解
            return 0;
        ans = std::max(ans, cur); // 更新 ans
        if (cur != i)
            swap(matrix[cur], matrix[i]); // 交换方程
        for (int j = 1; j <= m; j++)
            if (i != j && matrix[j].test(i)) // 可以消元
                matrix[j] ^= matrix[i];     // 异或消元
    }
    return ans;
}
int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1, res; i <= m; i++)
    {
        scanf("%s%d", buffer, &res);
        for (int j = 0; j < n; j++)
            matrix[i].set(j + 1, buffer[j] == '1'); // 增广矩阵赋值系数
        matrix[i].set(0, res); // 常数
    }
    int ret = GaussElimination(n, m); // 高斯消元
    if (ret)
    {
        printf("%d\n", ret);
        for (int i = 1; i <= n; i++)
            printf("%s\n", matrix[i].test(0) ? ALIEN : EARTH);
    }
    else printf("Cannot Determine\n");
    return 0;
} 