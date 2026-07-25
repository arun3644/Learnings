package ticTacToe;

public class Board {
	static char[][] board;
	public Board() {
		board = new char[3][3];
		for(int i=0;i<3;i++) {
			for(int j=0;j<3;j++) {
				board[i][j]='_ ';
			}
		}
	}
	public static void print() {
		for(int i=0;i<3;i++) {
			for(int j=0;j<3;j++) {
				try {
					System.out.print(board[i][j]);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			System.out.println();
		}
	}
}
