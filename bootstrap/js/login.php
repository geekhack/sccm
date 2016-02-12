class Login {
	public $db_connect = null;
	public function __construct() {
		if(!isset($_SESSION)) {
			session_start();
		}
		if(isset($_POST['submit'])) {
			$this->loginUser($_POST['username'], $_POST['password']);
		}
	
	}
	public function dbConnect() {
		$dsn = 'mysql:host=localhost;dbname=phpsite;';
		$user = 'root';
		$password = '';
		if($this->db_connect != null) {
			return true;
		} else {
			try {
				$this->db_connect = new PDO($dsn, $user, $password);
				return true;
			} catch (PDOException $e) {
				echo 'Connection failes: ' . $e->getMessage(); 
				return false;
			}
		}
	}
	public function getUserData($username) {
		if ($this->dbConnect()) {
		$check_user = $this->db_connect->prepare('SELECT * FROM users WHERE username = :username');
		$check_user->bindValue(':username', $username, PDO::PARAM_STR);
		$check_user->execute();
		return $check_user->fetchObject();
		} else {
			return false;
		}
	}
	public function loginUser($username, $password) {
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);
		if(empty($username)) {
			echo 'empty username';
		} elseif (empty($password)) {
			echo 'empty password';
		} else {
			if ($this->dbConnect()) {
			$check_user = $this->db_connect->prepare('SELECT * FROM users WHERE username = :username');
			$check_user->bindValue(':username', $username, PDO::PARAM_STR);
			$check_user->execute();
			$result = $check_user->fetchObject();
			if (!isset($result->id)) {
				echo 'Login failed';
			} elseif (!password_verify($password, $result->password)) {
				echo 'Login failed';
			} else {
				$_SESSION['user_id'] = $result->id;
				$_SESSION['user_name'] = $result->username;
				$_SESSION['loggedin'] = TRUE; 
			
				$url = SITE_PATH;
				header("Location: $url");
					
				}
			}
		}
	}
	public function isLoggedIn() {
		if (isset($_SESSION['loggedin'])) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
	public function getCurrentUsername() {
		return $_SESSION['user_id'];
	}
}