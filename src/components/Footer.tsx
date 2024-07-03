import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import DatasetLinkedOutlinedIcon from "@mui/icons-material/DatasetLinkedOutlined";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "& .section": {
          [theme.breakpoints.down("sm")]: {
            padding: "1rem 0",
          },
        },
        "& .footer-icons": {
          [theme.breakpoints.down("sm")]: {
            marginBottom: "1rem",
          },
        },
      }}
    >
      <footer className="section footer">
        <ul className="footer-icons">
          <li>
            <a href="#" className="footer-icon">
              <FacebookOutlinedIcon />
            </a>
          </li>

          <li>
            <a href="#" className="footer-icon">
              <ConnectWithoutContactOutlinedIcon />
            </a>
          </li>

          <li>
            <a href="#" className="footer-icon">
              <DatasetLinkedOutlinedIcon />
            </a>
          </li>
        </ul>

        <p className="copyright">
          copyright &copy; Fashion Flair
          <span> {new Date().getFullYear()}</span>. all rights reserved
        </p>
      </footer>
    </Box>
  );
};

export default Footer;
