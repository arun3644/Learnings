public interface Innerpractice {
    int add(int a,int b);
    int mul(int a, int b, int c);
}
public class practice{
    public static void main(String args[]){
       Innerpractice inner = (a,b) -> a + b;
       System.out.println(inner.add(3,4));
    }
}