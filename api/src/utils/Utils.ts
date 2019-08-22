
class Utils {
    public static calcularJuros(valor, parcelas) {
        var num = Number(valor);
        switch (parcelas) {
            case "1":
                var retorno = ((num / 100) * 3.79) + num;
                return retorno;
            case "2":
                var retorno = ((num / 100) * 5.78) + num;
                return retorno;
            case "3":
                var retorno = ((num / 100) * 7.77) + num;
                return retorno;
            default:
                return null;
        }
    }
}
export default Utils;